"use strict";
//Login to Moralis Server
const serverUrl = "https://tr36nxzpubtx.usemoralis.com:2053/server";
const appId = "8DAyMLl3iyK6jPvzUBnJmooKWZJVhpbtsyDE1w9b";
Moralis.start({ serverUrl, appId });

//Button linked to html page
const loginButton = document.getElementById("loginButton");
const userWallet = document.getElementById("userWallet");
const customText = document.getElementById("customText");

// checking if metamask is installed
function toggleButton() {
  if (!window.ethereum) {
    // return message metamask is not install and chagne the appearnace of button
    loginButton.innerText = "MetaMask is not installed";
    loginButton.classList.remove("bg-purple-500", "text-white");
    loginButton.classList.add(
      "bg-gray-500",
      "text-gray-100",
      "cursor-not-allowed"
    );
    return false;
  }

  //Click the the login button to run login with metamask
  loginButton.addEventListener("click", loginWithMetaMask);
}

// Check user login status, if login, change the login button to logout
function checkUserLogin() {
  if (Boolean(Moralis.User.current())) {
    // If the user is login then change the button to click to logout
    loginButton.innerText = "Sign out of MetaMask";
    loginButton.removeEventListener("click", loginWithMetaMask);
    setTimeout(() => {
      loginButton.addEventListener("click", signOutOfMetaMask);
    }, 200);
    console.log(`login user is ${Moralis.User.current().get("ethAddress")}`);
  }
  return false;
}

checkUserLogin();

// Login Metamask using Moralis, remove login button and replace with logout button
async function loginWithMetaMask() {
  let user = Moralis.User.current();
  if (!user) {
    // if the user is not login using metamask then proceed with authenticatation
    user = await Moralis.authenticate({
      signingMessage: "This is the message of signinig in",
    });
  }
  console.log("logged in user:", user);
  // change the appearnce of button after user login
  loginButton.innerText = "Sign out of MetaMask";
  // remove the link of login to logout and put a delay of 200ms
  loginButton.removeEventListener("click", loginWithMetaMask);
  setTimeout(() => {
    loginButton.addEventListener("click", signOutOfMetaMask);
  }, 200);
}

// Logout Metamask using Moralis - remove logout button and replace with login button
async function signOutOfMetaMask() {
  await Moralis.User.logOut();
  loginButton.innerText = "Sign in with MetaMask";
  loginButton.removeEventListener("click", signOutOfMetaMask);
  setTimeout(() => {
    loginButton.addEventListener("click", loginWithMetaMask);
  }, 200);
  console.log("logged out");
}

// load and check if metamask is install at the beginning before html is loaded
window.addEventListener("DOMContentLoaded", () => {
  toggleButton();
});
