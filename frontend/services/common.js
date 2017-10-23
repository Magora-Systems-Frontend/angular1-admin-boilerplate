/**
 * Public API methods such as upload picture on Amazone
 */
class Common {
  constructor($http, $q, Upload) {
    'ngInject'
    
    this.$http = $http;
    this.$q = $q;
    this.Upload = Upload;
  }
  
  uploadPicture(contentType, file, storeId) {
    const deferUpload = this.$q.defer();
    this.$http.post(`${process.env.API_ADMIN_URL}/stores/${storeId}/resources/resources`, {contentType}).then((response) => {
      const {uploadUrl, resourceId} = response.data.data;
      
      return this.Upload.upload({
        method: "PUT",
        url: uploadUrl,
        data: file,
        _isDigested: true,
        headers: {
          "Content-Type": file.type
        }
      }).then(() => {
        deferUpload.resolve({resourceId});
      })
    });
    return deferUpload.promise;
  }
  
  checkPictureStatus(resourceId, timeSpan = 3000, storeId) {
    const deferCheck = this.$q.defer();
    const callback = (response) => {
      if (!response.data.data.ready) {
        check();
      } else {
        deferCheck.resolve(response);
      }
      return response;
    };
    const check = () =>
      setTimeout(
        () => this.$http.get(`${process.env.API_ADMIN_URL}/stores/${storeId}/resources/resources/${resourceId}`).then(callback),
        timeSpan);
    
    check();
    
    return deferCheck.promise;
  }
}

export default Common;
