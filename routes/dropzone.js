exports.index = function(req, res){
  res.render('index', { title: 'DropzoneJS' });
};

exports.index2 = function(req, res){
  res.render('index2', { title: 'DropzoneJS'});
};

exports.fileUpload = function(req, res, fs, dirname){
  /*console.log("test: ", req.files);*/
  var myFile = req.files.file;
  console.log("File: ", myFile);
  
  try {
	fs.readFile(myFile.path, function (err, data) {
	  /*console.log("File read: ", __dirname);*/
	  var newPath = dirname + "\\public\\files\\"+myFile.originalFilename;
	  /*console.log("Saved file err: " + err);
	  console.log("Saved file data: " + data);
	  console.log("Saved file path: " + newPath);*/
	  var fileUploadResponseVal = "File Uploaded";
	  if(err){
	  	fileUploadResponseVal = "Error: " + err;
	  }
	  fs.writeFile(newPath, data, function (err) {
	    /*console.log("Writing File");*/
	    if(err){
	      fileUploadResponseVal = "Error: " + err;	       
	    }
	    res.send(fileUploadResponseVal);
	  });
	});
  } catch (err){
  	console.log("ERROR READING OR WRITING FILE: ", err);
  }
}

var is_array = function (value) {
	return value &&
	typeof value === 'object' &&
	typeof value.length === 'number' &&
	typeof value.splice === 'function' &&
	!(value.propertyIsEnumerable('length'));
};

saveFile = function(filesArray, req, res, fs, dirname){
	var myFile, isArray;
	if(is_array(filesArray)){
		isArray = true;
		myFile = filesArray[filesArray.length-1];
	} else {
		isArray = false;
		myFile = filesArray;
	}
	console.log("myFile.path: ", myFile.path);
	console.log("myFile.path: ", myFile.originalFilename);
    try {
	  fs.readFile(myFile.path, function (err, data) {
	    console.log("1");
	    var newPath = dirname + "\\public\\files\\"+myFile.originalFilename;
	    console.log("newPath: ", newPath);
	    var fileUploadResponseVal = "File Uploaded";
	    if(err){
	  	  fileUploadResponseVal = "Error: " + err;
	    }
	    fs.writeFile(newPath, data, function (err) {
	      if(err){
	        fileUploadResponseVal = "Error: " + err;	       
          }
          if(isArray){
          	filesArray.pop();
          	if(filesArray.length === 0){
	      		res.send(fileUploadResponseVal);
	        } else {
	  		  saveFile(filesArray, req, res, fs, dirname);
	        }
          } else {
			res.send(fileUploadResponseVal);
          }
	    });
	  });
    } catch (err){
  	  console.log("ERROR READING OR WRITING FILE: ", err);
    }
}

exports.fileUpload2 = function(req, res, fs, dirname){
  
  console.log("In file upload2");
  console.log("req.files, ", req.files);
  console.log("req.files.file, ", req.files.file);
  var filesArray = req.files.file[0];
  console.log("filesArray", filesArray);
  
  for(i in filesArray){
  	saveFile(filesArray, req, res, fs, dirname);  	
  }
}