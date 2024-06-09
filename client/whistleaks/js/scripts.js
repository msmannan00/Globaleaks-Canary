let lastHash = '';
var state = false;

setTimeout(() => {
  document.body.classList.add('fade-in');
  init();
}, 500);

window.addEventListener('popstate', function(event) {
  setTimeout(() => {
    document.body.style.opacity = '0';
    init();
    document.body.style.opacity = '1';
  }, 0);
});

function generateTenDigitIdFromHostname() {
    const hostname = window.location.hostname;
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i) | 0;
        }
        return Math.abs(hash).toString();
    }
    return simpleHash(hostname).padEnd(10, '0').slice(0, 10);
}

function checkProductStatus(productId) {
  const apiUrl = 'https://payment.whistleaks.com/check-product';

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ product_id: productId })
  });
}

function init() {
  let whistleBlowingLoginQuestionContent;
  if (window.location.hash.startsWith('#/admin')) {
    const productId = generateTenDigitIdFromHostname();
    checkProductStatus(productId).then(response => response.json())
    .then(data => {
      if (data.exists) {
        { 
          const subscriptionMsg = {
            en: `
            <div id="subscription-status" class="p-3 mb-2 bg-primary d-flex justify-content-between align-items-center">
              <p class="text-white fw-semibold mb-0">You are currently subscribed to our service. You can view your payment information by going to payments</p>
              <a target="_blank" class="btn btn-info text-white" href="https://payment.whistleaks.com/">Payments</a>
            </div>
            `
          };
          GL.mockEngine.addMock('*', 'views-header', localizedMock(subscriptionMsg), 'add-before');
        }
      } else {
        { 
          const subscriptionMsg = {
            en: `
            <div id="subscription-status" class="p-3 mb-2 bg-warning d-flex justify-content-between align-items-center">
              <p class="text-white mb-0 fw-semibold">You are not subscribed to our service. This system data is at risk of being lost.</p>
              <a target="_blank" class="btn btn-warning" href="https://payment.whistleaks.com/">Payments</a>
            </div>
            `
          };
          GL.mockEngine.addMock('*', 'views-header', localizedMock(subscriptionMsg), 'add-before');
        }
      }
    })
  }
  { // Secondary content hero block
    const frontPageSecondaryHeroContent = {
      en: `
      <div class="hero-block hero-block-secondary">
        <div><img src="data/whistleaks/images/tavarantarkastus-icon.png"  alt=""/></div>
        <h2>We will process your notifications confidentially</h2>
        <p>Only persons who we have authorised to process the notifications will receive and be able to see your notification. They will process the notification appropriately and take into account the requirements of the law on the protection of whistleblowers. You can submit the notification anonymously if you want. </p>

        <p>Please save the code that you receive after submitting the notification. You will be able to sign in with the code and track the progress of your notification’s processing. If necessary, we will ask you for further information in the course of processing the notification.</p>

        <p>We will try to confirm the receipt of the notification through the channel within 7 days from submission. After that, we will inform you within 3 months about what measures we have taken on the basis of the notification. </p>

        <p>To provide feedback on our services or activities, you can find a link to the feedback form below. </p>

        <p>In certain situations, it is possible to report misconduct to the Chancellor of Justice's centralized external reporting channel. Please read the instructions <a href="https://oikeuskansleri.fi/en/centralised-external-reporting-channel" rel="noopener" target="_blank">here</a>. </p>

      </div>
      `
    };
    GL.mockEngine.addMock('*', '#HomePageBox', localizedMock(frontPageSecondaryHeroContent), 'add-before');
  }
  { // Front page: Logo Change
    const whistleBlowingLogoContent = {
      en: `
        <img class="img-fluid pointer" [alt]="appDataService.projectTitle" src="data/whistleaks/images/logo.png"  alt=""/>
      `
    };
    GL.mockEngine.addMock('*', '#LogoBox', localizedMock(whistleBlowingLogoContent), 'replace');
  }
  { // Front page: New submission
    const whistleBlowingQuestionContent = {
      en: `
        <h2>Submit a new notification</h2>
        <p>Do you wish to report a suspected breach or unethical conduct?</p>
      `
    };
    GL.mockEngine.addMock('*', '#id="WhistleblowingButton"', localizedMock(whistleBlowingQuestionContent), 'replace');
  }
  { // Front page: View existing submission
    whistleBlowingLoginQuestionContent = {
      en: `
         <markdown id="WhistleblowingQuestion" class="ng-star-inserted">
         <h2>Submit a new notification</h2>
           <p>Do you wish to report a suspected breach or unethical conduct?</p>
         </markdown><br>
      `
    };
    GL.mockEngine.addMock('*', '#WhistleblowerSubmitBox', localizedMock(whistleBlowingLoginQuestionContent), 'add-before');
  }
  { // Admin page: add payment
    whistleBlowingLoginQuestionContent = {
      en: `
        <a routerLinkActive="active" href="https://payment.whistleaks.com/" aria-current="page" target="_blank">
            <i class="fa fa-credit-card"></i>
            <span>Payment</span>
            <br><br>
            ID : ${generateTenDigitIdFromHostname()}
        </a>
      `
    };
    GL.mockEngine.addMock('*', '.nav-items', localizedMock(whistleBlowingLoginQuestionContent), 'add-after');
  }
  { // Front page: View existing submission
    whistleBlowingLoginQuestionContent = {
      en: `
        <h2>Track notification status</h2>
        <p>After submitting a notification you receive a code to sign in and track the progress of your notification’s processing. Enter the code here:</p>
      `
    };
    GL.mockEngine.addMock('*', '#WhistleblowerLoginQuestion', localizedMock(whistleBlowingLoginQuestionContent), 'replace');
  }

  { // Admin welcome text
    var adminWelcomeText = {
      en: `
        <div>
          <h4 class="mb-3 mt-3">You are signed in Your organization’s whistleblowing channel.</h4>
          <div class="mb-2">Whistleblowers reports can be accessed via Reports-tab. Your user account’s preferences can be found in the top right corner.</div>
          <div>Important to note: Please save account recovery key from user’s preferences to be able to access your account and reports in case of losing Your password. Without the account recovery key neither account nor reports can be accessed anymore. Finland Chamber of Commerce does not have any access to passwords, recovery keys and reports.</div>
        </div>
      `
    };
    GL.mockEngine.addMock('*', '#AdminHomepage', localizedMock(adminWelcomeText));
    GL.mockEngine.addMock('*', '#RecipientHomepage', localizedMock(adminWelcomeText));
  }

  { // Footer
    var footerContent = {
      en: `
          <div class="mt-5 pt-5 pb-5 footer-main">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 col-xs-12 about-company">
                <h2>Whistleaks</h2>
                <p class="pr-5 text-white-50">Whistleaks is a global whistleblowing system for reporting misconduct, fraud, or unethical behavior in online interactions.</p>
                <p>
                  <a href="https://www.youtube.com/watch?v=Q6k8hHAoIKA&ab_channel=Christiaan008">
                      &nbsp;&nbsp;<img src="data/whistleaks/images/youtube.png" class="img-fluid icon-size" alt=""/>
                  </a>
                  <a href="https://www.linkedin.com/company/whistleaks/">
                      &nbsp;&nbsp;<img src="data/whistleaks/images/linkedin.png" class="img-fluid icon-size" alt=""/>
                  </a>
                </p>
              </div>
              <div class="col-lg-3 col-xs-12 links">
                <h4 class="mt-lg-0 mt-sm-3">Links</h4>
                  <ul class="m-0 p-0">
                    <li>- <a href="https://www.whistleaks.com/" class="url-weight">Homepage</a></li>
                    <li>- <a href="https://www.whistleaks.com/about" class="url-weight">About Us</a></li>
                    <li>- <a href="https://www.whistleaks.com/whistleblowing-awareness-week" class="url-weight">Awareness Week</a></li>
                    <li>- <a href="https://www.whistleaks.com/contact" class="url-weight">Contact Us</a></li>
                  </ul>
              </div>
              <div class="col-lg-4 col-xs-12 location">
                <h4 class="mt-lg-0 mt-sm-4">Location</h4>
                <p>Whistleaks Limited, Studio X, Boundary Road, Colchester CO4 3ZQ, United Kingdom.</p>
                <p class="mb-0"><i class="fa fa-globe mr-3"></i>&nbsp;<a href="https://www.whistleaks.com/" class="text-decoration-none text-reset url-weight">www.whistleaks.com/</a></p>
                <br>
                <p>
                  <i class="fa fa-envelope-o mr-3"></i>&nbsp;
                  <a href="mailto:info@whistleaks.com" class="text-decoration-none text-reset url-weight">Customer Support</a>
                </p>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col copyright">
                <p class=""><small class="text-white-50">© 2024. All Rights Reserved.</small></p>
              </div>
            </div>
          </div>
          </div>
          `
    };
    GL.mockEngine.addMock('*', '#AttributionClause', localizedMock(footerContent));
  }

  function localizedMock(mocks) {
    return function getLocalizedMock(element) {
      const mockElement = element.querySelector('.Mock');
      if (mockElement) {
        mockElement.parentNode.removeChild(mockElement);
      }
      return mocks[GL.language] || mocks['en'];
    }
  }
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}



function routeChangeHandler() {
  if (window.location.hash !== lastHash) {
    lastHash = window.location.hash;
    if (window.location.hash.startsWith('#/admin') && (state == false)) {
      state = true;
      init();
    }
    if (window.location.hash.startsWith('#/login')) {
      state = false;
      removeSubscriptionStatus();
    }
  }
}

function removeSubscriptionStatus() {
  const elements = document.querySelectorAll('#subscription-status');
  elements.forEach(element => element.remove());
}

const targetNode = document.querySelector('router-outlet') || document.body;
const config = { childList: true, subtree: true };

const observerCallback = debounce(function(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      routeChangeHandler();
      break;
    }
  }
}, 100);

const observer = new MutationObserver(observerCallback);
observer.observe(targetNode, config);
