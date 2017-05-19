var app = angular.module('materialServer',[]);
app.factory('materialSer',function ($http) {
    return {
        listMaterial : listMaterial,
        countMaterial:countMaterial,
        addMaterial:addMaterial,
        getMaterial:getMaterial,
        editMaterial:editMaterial,
        deleteMaterial:deleteMaterial,
        congealMaterial:congealMaterial,
        thawMaterial:thawMaterial,
        collectMaterial:collectMaterial
    };
    function listMaterial(data) {
        return $http.get('/listMaterial',{params:data})
    }
    function countMaterial() {
        return $http.get('/countMaterial')
    }
    function addMaterial(data) {
        return $http.post('/addMaterial',data)
    }
    function getMaterial(data) {
        return $http.get('/getMaterial',{params:data})
    }
    function editMaterial(data) {
        return $http.post('/editMaterial',data)
    }
    function deleteMaterial(data) {
        return $http.get('/deleteMaterial',{params:data})
    }
    function congealMaterial(data) {
        return $http.get('/congealMaterial',{params:data})
    }
    function thawMaterial(data) {
        return $http.get('/thawMaterial',{params:data})
    }
    function collectMaterial(data) {
        return $http.post('/collectMaterial',data)
    }

});
