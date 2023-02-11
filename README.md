# BE_CASE_6

# Run

npm i --save
npm run start:dev

# API localhost:8080

//company:

1. POST localhost: 8080/company/login  
   (đăng nhập dành cho doanh nghiệp, yêu cầu đăng nhập bằng email đã đăng ký, mật khẩu được hệ thống gửi đến mail của
   người đăng ký)

2. POST http://localhost: 8080/company/register  
   (đăng ký doanh nghiệp , yêu cầu bắt buộc có trường email, name, phoneNumber, address)

3. PUT http://localhost: 8080/company/update/:companyId
   (update thông tin doanh nghiệp,phải đủ tất cả các trường mới cho đăng bài tuyển dụng)

# user

1. POST localhost: 8080/company/login

# job

1. GET localhost:8080/job ( Lấy tất cả danh sách công việc)
2. POST localhost:8080/job (đăng thông tin công việc )
   JobRouter.put('/:id',JobController.edit) / sửa thông tin công việc |localhost:8080/job/:id
   JobRouter.delete('/:id',jobController.delete) / xóa thông tin công việc|
   JobRouter.post('/search',jobController.search) / Tìm thông tin công việc theo tên công việc |
3. localhost:8080/job/search
   JobRouter.post('/searchAddress',jobController.searchAddress) / Tìm thông tin công việc theo địa chỉ công việc
   |localhost:8080/job/searchAddress
   JobRouter.get('/:id',JobController.jobStatus) / lock/unlock status | localhost:8080/job/:id
   JobRouter.get('/company/:id',JobController.findJobById) / Tìm thông tin công việc theo id company |localhost:
   8080/job/company/:id