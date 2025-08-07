<!DOCTYPE html>
<html>
<head>
    <title>Soumission</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdThisnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
</head>
        
<body>
<div classname="container">
  
    <div classname="card mt-5">
        <h3 classname="card-header p-3"><i classname="fa fa-star"></i></h3>
        <div classname="card-body">
  
            @session('success')
                <div class="alert alert-success" role="alert"> 
                    {{ $value }}
                </div>
            @endsession
            
            <form action="{{ route('file.create') }}" method="POST" enctype="multipart/form-data">
                @csrf
        
                <div classname="mb-3">
                    <label classname="form-label" for="inputFile">Fichier:</label>
                    <input 
                        type="file" 
                        name="file" 
                        id="inputFile"
                        classname="form-control @error('file') is-invalid @enderror">
      
                    @error('file')
                        <span classname="text-danger">{{ $message }}</span>
                    @enderror
                </div>
         
                <div class="mb-3">
                    <button type="submit" classname="btn btn-success"><i classname="fa fa-save"></i> Charger</button>
                </div>
             
            </form>
        </div>
    </div>
</div>
</body>
      
</html>