var app=angular.module('MyApp');
app.controller('LoginandLogoutController', ['$scope','$http','$location',function($scope,$http,$location)
{
	$scope.UserName="";
	$scope.Password="";
	$scope.SignupUserName="";
	$scope.SignupPassword="";
	$scope.Login=function() {
		$http({
	        url: "http://localhost:3000/users/login",
	        method: "POST",
	        data: {username: $scope.UserName, password:$scope.Password}
	    })
	    .then(function(response) {
	    	if (typeof(Storage) !== "undefined") {
    			// Store
			    localStorage.setItem("username", $scope.UserName);
			    // Retrieve
			} else {
			    alert("Your browser doesnt support Web Storage");
			}
	    	$scope.UserName="";
			$scope.Password="";
			$scope.LoginForm.$setPristine();
			$location.path("posts");
	    },
	    function(response) {
	    	alert("Error while Login" + response.status);
	    	console.log(response.statusText);
	    	console.log(response.status);
	    });
	};
	$scope.Signup=function() {
		$http({
	        url: "http://localhost:3000/users/register",
	        method: "POST",
	        data: {"username": $scope.SignupUserName, "password":$scope.SignupPassword}
	    })
	    .then(function(response) {
	    	if (typeof(Storage) !== "undefined") {
    			// Store
			    localStorage.setItem("username", $scope.SingnupUserName);
			    // Retrieve
			} else {
			    alert("Your browser doesnt support Web Storage");
			}
	    	$scope.SignupUserName="";
			$scope.SignupPassword="";
			$scope.SignupForm.$setPristine();
			$location.path("posts");
	    },
	    function(response) {
	    	alert("Error while Registering " + response.status);
	    	console.log(response.statusText);
	    	console.log(response.status);
	    });
	};
}])
app.controller('PostsController', ['$scope','$http','$location',function($scope,$http,$location)
{
	let postsprototype = function(data) {
		this.id = data.id;
		this.title = data.title;
		this.content =data.content;
		this.time = data.createdAt;
		this.comments = data.comments;
		this.images = data.postsimages;
		this.user = data.user;
	};
	$scope.Posts=[];
	$scope.SearchContent="";
	$scope.SearchTitle="";
	$scope.GetPosts=function() {
		$http({
	        url: "http://localhost:3000/posts",
	        method: "GET"
	    })
	    .then(function(response) {
	    	$scope.Posts=[];
	    	let temp=response.data;
	    	temp.forEach((post) => {
	    		$scope.Posts.push(new postsprototype(post));
	    	});
	    },
	    function(response) {
	    	alert("Error while Getting the posts make sure you are loggedin" + response.status);
	    	console.log(response.statusText);
	    	console.log(response.status);
	    });
	};
	$scope.GetPosts();
	$scope.Logout=function() {
		$http({
	        url: "http://localhost:3000/users/logout",
	        method: "GET"
	    })
	    .then(function(response) {
	    	localStorage.removeItem("username");
	    	$location.path("/");
	    },
	    function(response) {
	    	alert("Error while Logout" + response.status);
	    	console.log(response.statusText);
	    	console.log(response.status);
	    });
	};
	$scope.AddComment=function(event,index) {
		let tempcomment=$("#text"+event.target.id).val();
		let username=localStorage.getItem("username", $scope.UserName);
		$scope.Posts[index].comments.push({comment:tempcomment,username:username});
		console.log($scope.Posts[index].comments);
		$http({
	        url: "http://localhost:3000/comments",
	        method: "POST",
	        data: {comment: tempcomment, postid: event.target.id}
	    })
	    .then(function(response) {
	    	$("#text"+event.target.id).val("");
			$location.path("posts");
	    },
	    function(response) {
	    	alert("Error while making comment" + response.status);
	    	console.log(response.statusText);
	    	console.log(response.status);
	    });
	};
	$scope.Search=function() {
		$http({
	        url: "http://localhost:3000/posts/search",
	        method: "POST",
	        data: {title: $scope.SearchTitle, content: $scope.SearchContent}
	    })
	    .then(function(response) {
	    	$scope.SearchContent="";
	    	$scope.SearchTitle="";
	    	$scope.Posts=[];
	    	$scope.SearchForm.$setPristine();
	    	let temp=response.data;
	    	console.log(temp);
	    	temp.forEach((post) => {
	    		$scope.Posts.push(new postsprototype(post));
	    	});
	    },
	    function(response) {
	    	alert("Error while Searching" + response.status);
	    	console.log(response.statusText);
	    	console.log(response.status);
	    });
	};
}])
app.controller('UploadPostsController', ['$scope','$http','$location',function($scope,$http,$location)
{
	$scope.TitleName="";
	$scope.TitleContent="";
	$(':file').on('change', function() {
	    var file = this.files[0];
	    //console.log(file.size);
	    //console.log(file.name);
	    //console.log(file.type);
	    if (file.size > 1000000) {
	        alert('max upload size is 1MB')
	    }
	    if(file.type!="image/jpeg" && file.type!="image/png" && file.type!="image/jpg") {
	    	alert("Upload only images PNG/JPEG only accepted");
	    }
	});
	var data = new FormData();
	$scope.UploadPosts=function() {
		$http({
	        url: "http://localhost:3000/posts",
	        method: "POST",
	        data: {title: $scope.TitleName, content:$scope.TitleContent}
	    })
	    .then(function(response) {
			$.each($("input[type='file']")[0].files, function(i, file) {
		    	data.append('file', file);
			});
			if($("input[type='file']")[0].files.length>0) {
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
			    	$scope.TitleName="";
					$scope.TitleContent="";
					$scope.UploadPostsForm.$setPristine();
					window.location.href="/#/posts";
			    })
			    .error((err) => {
			    	alert(err);
			    	console.log(err);
			    });
			}
			else {
				$scope.TitleName="";
				$scope.TitleContent="";
				$scope.UploadPostsForm.$setPristine();
				window.location.href="/#/posts";
			}
	    },
	    function(response) {
	    	alert("Error while adding new post" + response.status);
	    	console.log(response.statusText);
	    	console.log(response.status);
	    });
	};
}]);