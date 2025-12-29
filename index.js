const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. API Lấy danh sách xe (Tương ứng v/de1.php)
app.get('/api/v/de1', (req, res) => {
    const ds_xe = [
        { "BIEN_SO": "29A-12345", "TEN_XE": "Toyota Vios", "GIA_BAN": "350.000.000" },
        { "BIEN_SO": "30H-99999", "TEN_XE": "Mercedes C200", "GIA_BAN": "1.200.000.000" },
        { "BIEN_SO": "51G-55555", "TEN_XE": "Honda City", "GIA_BAN": "450.000.000" }
    ];
    // Trả về đúng object có key DS_XE_CU
    res.json({ "DS_XE_CU": ds_xe });
});

// 2. API Đăng nhập (Tương ứng v/Login_de1.php)
app.post('/api/v/Login_de1', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "123") {
        res.json({ "SUCCESS": "TRUE" });
    } else {
        res.json({ "SUCCESS": "FALSE" });
    }
});

// Render yêu cầu port phải linh hoạt qua process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại port ${PORT}`);
});