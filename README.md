# Hướng Dẫn cài đặt node và React song song

### 1. Clone project về hoặc pull mới nhất 

Mở terminal tại thư mục muốn lưu project chạy câu lệnh:

```
git clone https://github.com/dungxbuif/myChess_BaseDB.git
```

---

### **2. Tiến hành cài đặt thư viện (hoặc cài đặt lại thư viện cho chắc)**

Mở terminal trong thư mục `Vừa mới tải về` gõ lệnh:

```
npm i
npm i -D
```
Tạo bảng gõ lệnh:

```
npx sequelize db:migrate
```
---

### **3. Cấu hình react và Nodejs song song**

-  Cop thư mục React vào mức gốc của thư mục nodejs vừa mới tải về
-  Đổi tên thư mục React thành `client`
-  Để chạy gõ lệnh `npm run dev`

---

# Lưu ý

> Khi muốn up git từ thư mục gốc up git bình thường sẽ không up thư mục react
>
> Muốn up git react chạy lệnh:

```
cd client
```

hoặc mở terminal trong thư mục client và up git như bình thường

Khi có code mới mở terminal trong thư mục root `(nodejs)` và pull bình thường nodejs và react sẽ không ảnh hưởng đến nhau
---
# DB
![](https://raw.githubusercontent.com/dungxbuif/myChess_BaseDB/master/db.png)
