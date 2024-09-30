// script.js

// Access the video element and the image
const video = document.getElementById('video');
const capturedImage = document.getElementById('capturedImage');
const photoCapturedMessage = document.getElementById('photoCapturedMessage');
const nextStepButton = document.getElementById('next-step');
const retakeButton = document.getElementById('retake');
const confirmationImage = document.getElementById('confirmationImage');

// Access media devices for the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing the camera: ", err);
    });

// Capture the image
document.getElementById('capture').addEventListener('click', () => {
    // Create a canvas to capture the image
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    capturedImage.src = canvas.toDataURL('image/png'); // Get the image data
    capturedImage.style.display = 'block'; // Show the captured image
    photoCapturedMessage.style.display = 'block'; // Show the message
    nextStepButton.style.display = 'block'; // Show next step button
    retakeButton.style.display = 'block'; // Show retake button
});

// Retake the photo
retakeButton.addEventListener('click', () => {
    capturedImage.style.display = 'none'; // Hide captured image
    photoCapturedMessage.style.display = 'none'; // Hide message
    nextStepButton.style.display = 'none'; // Hide next step button
    retakeButton.style.display = 'none'; // Hide retake button
});

// Proceed to the next step
nextStepButton.addEventListener('click', () => {
    // Logic to show the next step
    confirmationImage.src = capturedImage.src; // Pass the captured image to the next step
    confirmationImage.style.display = 'block'; // Show it in the next step
    document.getElementById('step-1').style.display = 'none'; // Hide the first step
    document.getElementById('step-2').style.display = 'flex'; // Show the confirmation step
});

// Back to the capture step
document.getElementById('back-step').addEventListener('click', () => {
    document.getElementById('step-1').style.display = 'block'; // Show the first step
    document.getElementById('step-2').style.display = 'none'; // Hide the confirmation step
});