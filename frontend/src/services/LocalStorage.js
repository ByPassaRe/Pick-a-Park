const LocalStorageService = (function(){

    var _service;
    
    function _getService() {
        if(!_service) {
          _service = this;
          return _service
      }
      return _service
    }
    
    function _setToken(tokenObj) {
      localStorage.setItem("jwt", tokenObj);
    }

    function _getAccessToken() {
      return localStorage.getItem("jwt");
    }

    function _clearToken() {
      localStorage.removeItem("jwt");
    }

   return {
      getService : _getService,
      setToken : _setToken,
      getAccessToken : _getAccessToken,
      clearToken : _clearToken
    }

})();

export default LocalStorageService;