const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. API Lấy danh sách xe: Cho phép cả GET và POST
app.all('/api/v/de1', (req, res) => {
    const ds_xe = [
        { "BIEN_SO": "29A-12345", "TEN_XE": "Toyota Vios", "GIA_BAN": "350.000.000" },
        { "BIEN_SO": "30H-99999", "TEN_XE": "Mercedes C200", "GIA_BAN": "1.200.000.000" },
        { "BIEN_SO": "51G-55555", "TEN_XE": "Honda City", "GIA_BAN": "450.000.000" }
    ];
    res.json({ "DS_XE_CU": ds_xe });
});

// 2. API Đăng nhập: Chấp nhận cả dữ liệu từ URL (GET) và BODY (POST)
app.all('/api/v/Login_de1', (req, res) => {
    // Lấy username/password từ body (nếu dùng POST) hoặc từ query string (nếu dùng GET)
    const username = req.body.username || req.query.username;
    const password = req.body.password || req.query.password;

    console.log(`Đang thử đăng nhập: ${username}`);

    if (username === "admin" && password === "123") {
        res.json({ "SUCCESS": "TRUE" });
    } else {
        res.json({ "SUCCESS": "FALSE" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server linh hoạt đang chạy tại port ${PORT}`);
});