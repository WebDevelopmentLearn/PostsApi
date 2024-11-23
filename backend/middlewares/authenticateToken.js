import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers.authorization;
//
//     const token = authHeader && authHeader.split(" ")[1];
//
//     if (!token) {
//         //Если токен не передан
//        return res.status(401).json({
//             message: "Unauthorized: Token not provided"
//         })
//     }
//
//     //Проверяем и декодируем токен
//     jwt.verify(token, jwtSecret, (err, user) => {
//         if (err) {
//             return res.status(403).json({
//                 message: "Forbidden: Invalid or expired token"
//             })
//         }
//         //Если токен валидный, сохраняем данные пользователя в объекте запроса
//         req.user = user;
//         next();//Передаем управление дальше
//     })
// }
function authenticateToken(req, res, next) {
    const token = req.cookies.token;  // Токен будет доступен в req.cookies

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: Token not provided"
        });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Forbidden: Invalid or expired token"
            });
        }
        req.user = user;  // Сохраняем данные пользователя в запросе
        next();  // Передаем управление дальше
    });
}

export default authenticateToken;