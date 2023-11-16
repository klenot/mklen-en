export function BentoAnimation(){ 
  document.getElementById("bentoContainer").onmousemove = e => { /* this function is on the cards container */
      for(const bentoBox of document.getElementsByClassName("cv_bentoBox__Z5gRc")) {
        const rect = bentoBox.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;
    
        bentoBox.style.setProperty("--mouse-x", `${x}px`);
        bentoBox.style.setProperty("--mouse-y", `${y}px`);
      };
    }
};