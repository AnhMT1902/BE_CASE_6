API 8080
# Router 
JobRouter.get('/',JobController.getAll) / Lấy tất cả danh sách công việc
JobRouter.post('/',JobController.add) / đăng thông tin công việc 
JobRouter.put('/:id',JobController.edit) / sửa thông tin công việc
JobRouter.delete('/:id',jobController.delete) / xóa thông tin công việc
JobRouter.post('/search',jobController.search) / Tìm thông tin công việc theo tên công việc
JobRouter.post('/searchAddress',jobController.searchAddress) / Tìm thông tin công việc theo địa chỉ công việc
JobRouter.get('/:id',JobController.jobStatus) / lock/unlock status
JobRouter.get('/company/:id',JobController.findJobById) / Tìm thông tin công việc theo id company