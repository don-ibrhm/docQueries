const sendToServer = async (file) => {
    const formData = new FormData();
    formData.append('document', file);
  
    await fetch('http://localhost:8000/upload/', {
      mode: 'cors',
      method: 'POST',
      body: formData,
    }).then((response) => response.json()).then((data) => {
      console.log('File uploaded:', data);
    }).catch((error) => {
      console.error('Error uploading file:', error);
    });
  };
  
  export default sendToServer;
  