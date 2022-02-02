window.addEventListener("click", () => {

	const sideBar = document.getElementById("Sidebar");

	if (sideBar.offsetWidth === 250) {
		closeNav();
	}

});


function openNav() {
	document.getElementById("Sidebar").style.width = "250px";
	document.getElementsByClassName("iti__selected-flag")[0].style.zIndex = "0";
	document.getElementsByClassName("block-one")[0].style.opacity = 0.5;
}

function closeNav() {
	document.getElementById("Sidebar").style.width = "0";
	document.getElementsByClassName("iti__selected-flag")[0].style.zIndex = "1";
	document.getElementsByClassName("block-one")[0].style.opacity = 1;
}