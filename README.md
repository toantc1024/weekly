## Đồ án cuối kì môn học Trí Tuệ Nhân Tạo

- Ứng dụng thuật toán BFS và GreedyBest First Search vào trong AI lập thời gian học tập cho 1 tuần làm việc

# 1. Backend

Dẫn tới thư mục chứa backend,

```cd backend```

Tạo môi trường ảo
```python3 -m venv venv```

Kích hoạt môi trường ảo
Linux: ```source venv/bin/active```
Windows: ```venv\Scripts\activate```

Cài đặt các gói thư viện của python
```pip install -r requirements.txt```

Khởi chạy backend
```uvicorn main:app --reload```

Lúc này, thầy có thể test thử phần backend bằng địa chỉ `localhost:8000/docs`. 
Với request mẫu như sau:
```
{
  "schedule": [
    {
      "day": 0,
      "start": "7:00",
      "end": "8:50",
      "task": "Physicology"
    },
    {
      "day": 1,
      "start": "7:00",
      "end": "8:50",
      "task": "Physicology B"
    },
    {
      "day": 1,
      "start": "9:00",
      "end": "10:50",
      "task": "Physicology C"
    }
  ],
  "tasks": [
    {
      "name": "Watch Coraline",
      "duration": 150
    }
  ]
}
```
# 2. Frontend
Đối với phần giao diện, yêu cầu cài đặt NodeJS >= 18 vào máy hoặc thầy có thể test trực tiếp trên đường link deploy.
Để sử dụng giao diện trực tiếp trên máy. Dẫn đến thư mục cha (chứa folder backend và frontend)
```cd frontend```
Cài đặt các thư viện
```npm install```
Để khởi chạy ứng dụng frontend
```npm run start```

Máy sẽ tự động mở trang web hoặc truy cập trực tiếp trên địa chỉ mặc định: `localhost:3000`.

