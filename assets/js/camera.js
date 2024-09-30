// Accessing necessary elements
const video = document.getElementById('video');
const captureButton = document.getElementById('capture');
const retakeButton = document.getElementById('retake');
const nextStepButton = document.getElementById('next-step');
const capturedImage = document.getElementById('capturedImage');
const confirmationImage = document.getElementById('confirmationImage');
const photoCapturedMessage = document.getElementById('photoCapturedMessage');

// Access the device camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing camera: ", err);
    });

// Capture image
captureButton.addEventListener('click', () => {
    // Turn on the flashlight (iOS only)
    const track = video.srcObject.getVideoTracks()[0];
    const settings = track.getSettings();
    if (settings.torch) {
        track.applyConstraints({ advanced: [{ torch: true }] });
    }
    
    // Create a canvas to capture the frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get the data URL from the canvas
    const dataURL = canvas.toDataURL('image/png');
    
    // Show the captured image
    capturedImage.src = dataURL;
    capturedImage.style.display = 'block';
    
    // Show success message and buttons
    photoCapturedMessage.style.display = 'block';
    retakeButton.style.display = 'inline-block';
    nextStepButton.style.display = 'inline-block';
    captureButton.style.display = 'none';
});

// Retake the photo
retakeButton.addEventListener('click', () => {
    capturedImage.style.display = 'none';
    photoCapturedMessage.style.display = 'none';
    retakeButton.style.display = 'none';
    nextStepButton.style.display = 'none';
    captureButton.style.display = 'inline-block';
});

// Proceed to the next step
nextStepButton.addEventListener('click', () => {
    // Hide the capture step and show the confirmation step
    document.getElementById('step-1').classList.remove('step-active');
    document.getElementById('step-2').classList.add('step-active');
    
    // Display the captured image in the confirmation step
    confirmationImage.src = capturedImage.src;
});

// Go back to the capture step
document.getElementById('back-step').addEventListener('click', () => {
    document.getElementById('step-2').classList.remove('step-active');
    document.getElementById('step-1').classList.add('step-active');
});