$("document").ready(function() {
	$(':file').on('change', function() {
	    var file = this.files[0];
	    console.log(file.size);
	    console.log(file.name);
	    console.log(file.type);
	    if (file.size > 1000000) {
	        alert('max upload size is 1MB')
	    }
	    if(file.type!="image/jpeg" && file.type!="image/png" && file.type!="image/jpg") {
	    	alert("Upload only images PNG/JPEG only accepted");
	    }
	});
	var data = new FormData();
	//var fileData = new FormData();
	//fileData.append("FIleName",$('form')[0]);
	$('#submitbutton').on('click', function() {
		$.each($("input[type='file']")[0].files, function(i, file) {
			console.log("Inside");
		    data.append('file', file);
		});
		console.log(data);
	    $.ajax({
	        // Your server script to process the upload
	        url: ' http://localhost:3000/postimages',
	        type: 'POST',
	        // Form data
	        data: data,
	        // Tell jQuery not to process data or worry about content-type
	        // You *must* include these options!
	        cache: false,
	        contentType: false,
	        processData: false,
	    })
	    .done((msg) => {
	    	alert("Uploaded Succesfully");
	    	console.log(msg);
	    })
	    .error((err) => {
	    	alert(err);
	    	console.log(err);
	    });
	});
});
/*(function(){
	'use strict';
	//Angular Module Initialization
	let app=angular.module('BlogApp',[])
	//Controller Initialization
	.controller('MainController',['$scope','$http',function($scope,$http) {
		$scope.upload = function () {
            var file = angular.element(document.querySelector('.input-group').children)//.prop("files")[0];
            console.log(file);
            console.log(file["input#file"]);
            $scope.files = [];
            if(file.length>1) {
            	for(let i=0;i<file.length;i++) {
            		console.log(file[i]);
            		//let temp=file[i].prop("files")[0];
            		//$scope.files.push(temp);
            	}
            }
            else {
            	let temp = file.prop("files")[0];
            	$scope.files.push(temp);
            	//console.log(temp);
            }
            console.log($scope.files);
        	$http({
                method: 'POST',
                url: ' http://localhost:3000/postimages',
                headers: { 'Content-Type': undefined },
                transformRequest: function (data) {
                	console.log(data.files[0]);
                    var formData = new FormData();
                    //formData.append('model', angular.toJson(data.model));
                    formData.append('file', data.files[0]);
                    return formData;
                },
                data: { model: { title: 'hello'}, files: $scope.files }

            }).success(function (res) {
                console.log(res)
            });
        };
	}])
})();*/