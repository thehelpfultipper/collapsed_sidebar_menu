// Grab the menu from the DOM
const menu = document.querySelector('#hbg-menu');

// Get list of all spans
const bars = document.querySelectorAll('span');

// Get mask
const mask = document.querySelector('.mask');

// Get primary and sub panels 
const primary = document.querySelector('#primary-sidepanel');
const subPnls = document.querySelectorAll('.sub-menu');

// Submenu togglers
const subTogglers = document.querySelectorAll('[data-target]');

// Submenu back buttons 
const submenuBtns = document.querySelectorAll('[data-back]');

// Toggler for aria-hidden 
const toggler = (panel) => {
  if( panel.getAttribute('aria-hidden') === 'true' ) {
    panel.setAttribute('aria-hidden', 'false');
  } else {
    panel.setAttribute('aria-hidden', 'true');
  }
}

// Display of hamburger menu and panels 
const display = () => {
  // Loop through the bars list
  bars.forEach( (bar, i) => {
    i === 0 && bar.classList.toggle('top-center'); 
    i === 2 && bar.classList.toggle('bottom-center');
    i === 1 && bar.classList.toggle('turn-90');    
  });
  
  menu.classList.toggle('turn-45');
    
  // Toggle aria-hiden accessibility value
  toggler(primary);
  
  primary.classList.toggle('sidebar-open');
  mask.classList.toggle('mask-open');
  
  if( isSubOpen === true ) {
    subPnls.forEach( subPnl => {
      subPnl.classList.remove('sidebar-open');
      toggler(subPnl);
    });
  }
}

let isSubOpen = false;

// Detect click event on hamburger menu
menu.addEventListener('click', () => {
  display();
});

// Detect click on submenu toggler
subTogglers.forEach( sub => {
  sub.addEventListener('click', () => {
    let target = sub.getAttribute('data-target');
    let pnl = document.querySelector(`${target}`);
    pnl.classList.add('sidebar-open');
    toggler(pnl);
    isSubOpen = true;
  });
});

// Detect click on submenu back button
submenuBtns.forEach( subBtn => {
  subBtn.addEventListener('click', () => {
    let target = subBtn.getAttribute('data-back');
    let pnl = document.querySelector(`${target}`);
    pnl.classList.remove('sidebar-open');
    toggler(pnl);
    isSubOpen = false;
  });
});

// Control nav with click outside of hbg-menu
document.addEventListener('click', (e) => {
  if( e.target.classList[0] === 'mask' ){
      display();
  } 
});

