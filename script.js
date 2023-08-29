var timeout;
var lastMouseX = -1;
var lastMouseY = -1;


// Function to create a line at the mouse position
function createLine(event) {
    var lineContainer = document.getElementById('lineContainer');
    
    // Generate random height value between 5 and 150
    var randomHeight = Math.floor(Math.random() * 146) + 5; // Height between 5 and 150
    
    // Create the original line
    var line = document.createElement('div');
    line.className = 'line';
    line.style.width = '2px'; // Set constant width
    line.style.height = randomHeight + 'px'; // Set random height
    
    // Position the line 30 pixels to the left of the mouse cursor
    line.style.left = (event.clientX - 51) + 'px'; // 30px + 1px adjustment
    line.style.top = (event.clientY - Math.floor(randomHeight / 2)) + 'px'; // Adjust to align in the middle
    
    // Determine line color based on mouse movement direction
    if (lastMouseY !== -1) {
        if (event.clientY < lastMouseY) {
            line.style.backgroundColor = 'green'; // Mouse moving up
        } else if (event.clientY > lastMouseY) {
            line.style.backgroundColor = 'red'; // Mouse moving down
        }
    }
    
    // Create the shorter line within the original line
    var shorterLine = document.createElement('div');
    shorterLine.className = 'line';
    
    // Generate random height value for the shorter line
    var randomShorterHeight = Math.floor(Math.random() * (randomHeight - 1)) + 1; // Height between 1 and randomHeight - 1
    
    shorterLine.style.width = '10px'; // Set fixed width for shorter line
    shorterLine.style.height = randomShorterHeight + 'px'; // Set random height for shorter line
    
    // Position the shorter line 30 pixels to the left of the mouse cursor
    shorterLine.style.left = (event.clientX - 56) + 'px'; // 30px + 6px adjustment
    shorterLine.style.top = (event.clientY - Math.floor(randomShorterHeight / 2)) + 'px'; // Adjust to align in the middle
    
    // Apply the same color as the original line
    shorterLine.style.backgroundColor = line.style.backgroundColor;
    
    // Append both lines to the container
    lineContainer.appendChild(line);
    lineContainer.appendChild(shorterLine);

    // Remove both lines after 2 seconds
    setTimeout(function() {
        line.style.opacity = '0';
        shorterLine.style.opacity = '0';
        setTimeout(function() {
            line.remove();
            shorterLine.remove();
        }, 500);
    }, 500);
}







// Function to clear the timeout when the mouse moves
function clearDisappearTimeout() {
    if (timeout) {
        clearTimeout(timeout);
    }
}

// Function to set a timeout to clear all lines if the mouse stops moving for 2 seconds
function setDisappearTimeout() {
    timeout = setTimeout(function() {
        var lines = document.getElementsByClassName('line');
        while (lines[0]) {
            lines[0].parentNode.removeChild(lines[0]);
        }
    }, 200);
}

document.addEventListener('mousemove', function(event) {
    clearDisappearTimeout(); // Clear the timeout if the mouse is moving

    // Check if the mouse has moved to the right by at least 20 pixels
    if (lastMouseX === -1 || event.clientX - lastMouseX >= 20) {
        createLine(event); // Create a line at the mouse position
        setDisappearTimeout(); // Set a timeout to clear all lines if the mouse stops moving
        lastMouseX = event.clientX;
    } else if (lastMouseX - event.clientX >= 20) {
        // If mouse moves to the left by at least 20 pixels, reset lastMouseX
        lastMouseX = event.clientX;
    }

    // Store the current vertical mouse position
    lastMouseY = event.clientY;
});

