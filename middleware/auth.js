import jwt from 'jsonwebtoken'

export default function auth(req, res, next) {
  const tokenHeader = req.header('Authorization')

  if (!tokenHeader)
    return res
      .status(401)
      .json({ msg: 'No token, authorisation failed', type: 'token' })

  const token = tokenHeader.split(' ')[1]

  if (!token)
    return res
      .status(401)
      .json({ msg: 'No token, authorisation failed', type: 'token' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid', type: 'token' })
  }
}
