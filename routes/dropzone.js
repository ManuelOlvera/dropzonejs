exports.index = function(req, res){
  res.render('index', { title: 'DropzoneJS', fileUploadResponse: undefined });
};

exports.fileUpload = function(req, res, fs, dirname){
  console.log("test: ", req.files);
  var myFile = req.files.file;
  console.log("File: ", myFile);
  
  try {
	fs.readFile(req.files.file.path, function (err, data) {
	  console.log("File read: ", __dirname);
	  var newPath = dirname + "\\public\\files\\"+req.files.file.originalFilename;
	  console.log("Saved file err: " + err);
	  console.log("Saved file data: " + data);
	  console.log("Saved file path: " + newPath);
	  var fileUploadResponseVal = "File Uploaded";
	  if(err){
	  	fileUploadResponseVal = "Error: " + err;
	  }
	  fs.writeFile(newPath, data, function (err) {
	    console.log("Writing File");
	    if(err){
	      fileUploadResponseVal = "Error: " + err;	       
	    }
	    return fileUploadResponseVal;
	  });
	});
  } catch (err){
  	console.log("ERROR READING OR WRITING FILE: ", err);
  }
}