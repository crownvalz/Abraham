<?php
$error = ''; // Initialize an error variable to store error messages
$result = ''; // Initialize a result variable to store the calculation results

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if all required fields are set
    $required_fields = ['loan_type', 'interest_rate', 'tenor_months', 'proposedLoanAmount', 'existingFacilityBalance', 'ablExistingMonthlyInstallment', 'installWithOtherBanks', 'netSalary', 'basicsalary', 'total_allowances'];
    $missing_fields = false;

    foreach ($required_fields as $field) {
        if (!isset($_POST[$field])) {
            $missing_fields = true;
            break;
        }
    }

    if ($missing_fields) {
        $error = "Oops! Some fields are missing or contain invalid input.";
    } else {
        // Extract input values
        $loan_type = $_POST['loan_type'];
        $interest_rate = floatval($_POST['interest_rate']);
        $tenor_months = intval($_POST['tenor_months']);
        $proposedLoanAmount = floatval($_POST['proposedLoanAmount']);
        $existingFacilityBalance = floatval($_POST['existingFacilityBalance']);
        $ablExistingMonthlyInstallment = floatval($_POST['ablExistingMonthlyInstallment']);
        $installWithOtherBanks = floatval($_POST['installWithOtherBanks']);
        $netSalary = floatval($_POST['netSalary']);
        $basicsalary = intval($_POST['basicsalary']);
        $total_allowances = intval($_POST['total_allowances']);

        if ($tenor_months <= 0 || $proposedLoanAmount <= 0) {
            $error = "Uh-oh! Tenor and Proposed Loan Amount should be greater than zero.";
        } else {

        // Calculate the adjusted net fixed salary ✅
        $adjustedNetFixedSalary = $netSalary + $ablExistingMonthlyInstallment - $total_allowances; 
        $deductionLimit = $basicsalary / 3;
        $totalfacility = $proposedLoanAmount + $existingFacilityBalance;
        $monthlyInstallment = $totalfacility * ($interest_rate / 12) * pow(1 + $interest_rate / 12, $tenor_months) / ((pow(1 + $interest_rate / 12, $tenor_months) - 1));
        $totalDeductions = $monthlyInstallment + $installWithOtherBanks;
        $netSalaryAfterDeductions = $adjustedNetFixedSalary - $totalDeductions;
        $debtRatio = (1 - ($netSalaryAfterDeductions / $basicsalary)) * 100;
        $grossSalary = $basicsalary + $total_allowances;

        // Prepare the result message
        $result .= "adjustedNetFixedSalary: TZS " . number_format($adjustedNetFixedSalary, 2) . "<br>";
        $result .= "deductionLimit : TZS " . number_format($deductionLimit, 2) . "<br>";
        $result .= "monthlyInstallment : TZS " . number_format($monthlyInstallment, 2) . "<br>";
        $result .= "totalDeductions: TZS " . number_format($totalDeductions, 2) . "<br>";
        $result .= "netSalaryAfterDeductions: TZS " . number_format($netSalaryAfterDeductions, 2) . "<br>";
        $result .= "Debt Ratio: " . number_format($debtRatio) . "%<br>";
        $result .= "Total Facility: TZS " . number_format($totalfacility). "%<br>";
        $result .= "grossSalary : TZS " . number_format($grossSalary). "%<br>";

        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Crowncalz - Index</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="assets/css/style.css" rel="stylesheet">

  <!-- =======================================================
  * Template Name: Crowncalz
  * Updated: Mar 10 2023 with Bootstrap v5.2.3
  * Template URL: https://Crowncalz.com/Crowncalz-free-skin-bootstrap-3/
  * Author: Crowncalz.com
  * License: https://Crowncalz.com/license/
  ======================================================== -->
</head>

<body>

  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top ">
    <div class="container d-flex align-items-center justify-content-between">
      <h1 class="logo"><a href="index.php">Crowncalz</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
          <li><a class="nav-link scrollto " href="#portfolio">Portfolio</a></li>
          <li class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li>
          <li><a class="getstarted scrollto" href="#about">Get Started</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->

  <main id="main">

    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>Portfolio Details</h2>
          <ol>
            <li><a href="index.html">Home</a></li>
            <li>Portfolio Details</li>
          </ol>
        </div>

      </div>
    </section><!-- End Breadcrumbs -->

    <!-- ======= Portfolio Details Section ======= -->
    <section id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row gy-4">


                    <!-- Display calculation results -->
                    <?php if (!empty($result)) : ?>
                    <div class="alert alert-success">
                        <h4>Calculation Results:</h4>
                        <?php echo $result; ?>
                    </div>
                <?php endif; ?>

                <!-- Display error messages -->
                <?php if (!empty($error)) : ?>
                    <div class="alert alert-danger">
                        <h4>Error:</h4>
                        <?php echo $error; ?>
                    </div>
                <?php endif; ?>

                <!-- Your form goes here -->
                <form method="POST">
    <div class="row">
        <div class="col-md-6 mb-3">
            <label for="loan_type" class="form-label">Loan Type:</label>
            <select class="form-control" id="loan_type" name="loan_type">
                <option value="">-Select Type-</option>
                <option value="Staff Loan">Staff Loan</option>
                <option value="Mortgage">Mortgage</option>
                <option value="Car Loan">Car Loan</option>
                <option value="Personal">Personal Loan</option>
                <option value="Student">Student Loan</option>
                <option value="Business">Business Loan</option>
            </select>
        </div>
        <div class="col-md-6 mb-3">
            <label for="interest_rate" class="form-label">Interest Rate:</label>
            <select class="form-control" id="interest_rate" name="interest_rate">
                            <option value="">-Select Rate-</option>
                            <script>
                                var interestRates = Array.from({ length: 26 }, (_, i) => (i + 1) * 0.01);
                                interestRates.forEach(rate => {
                                    var percentageValue = (rate * 100).toFixed(2).replace(/\.00$/, ''); // Convert to percentage and remove ".00"
                                    document.write(`<option value="${rate.toFixed(2)}">${percentageValue}%</option>`);
                                });
                            </script>
                        </select>
                    </div>
        <div class="col-md-6 mb-3">
            <label for="tenor_months" class="form-label">Tenor (Months):</label>
            <input type="number" id="tenor_months" name="tenor_months" class="form-control">
        </div>
        <div class="col-md-6 mb-3">
            <label for="proposed_loan_amount" class="form-label">Proposed Loan Amount:</label>
            <input type="number" id="proposed_loan_amount" name="proposedLoanAmount" class="form-control">
        </div>
        <div class="col-md-6 mb-3">
            <label for="existing_facility_balance" class="form-label">Existing Facility Balance:</label>
            <input type="number" id="existing_facility_balance" name="existingFacilityBalance" class="form-control">
        </div>
        <div class="col-md-6 mb-3">
            <label for="abl_existing_monthly_installment" class="form-label">Crown Bank Installment:</label>
            <input type="number" id="abl_existing_monthly_installment" name="ablExistingMonthlyInstallment" class="form-control">
        </div>
        <div class="col-md-6 mb-3">
            <label for="install_with_other_banks" class "form-label">Install with Other Banks:</label>
            <input type="number" id="install_with_other_banks" name="installWithOtherBanks" class="form-control">
        </div>
        <div class="col-md-6 mb-3">
            <label for="basicsalary" class="form-label">Basic Salary:</label>
            <input type="number" id="basicsalary" name="basicsalary" class="form-control">
        </div>
        <div class="col-md-6 mb-3">
            <label for="total_allowances" class="form-label">Total Allowances:</label>
            <input type="number" id="total_allowances" name="total_allowances" class="form-control">
        </div>
        <div class="col-md-6 mb-3">
            <label for="net_salary" class="form-label">Net Salary:</label>
            <input type="number" id="net_salary" name="netSalary" class="form-control">
        </div>
    </div>
    <div class="input-group mb-5 d-flex justify-content-between">
        <!-- Additional elements can be added here -->
    </div>
    <div class="input-group mb-3">
        <button type="submit" name="submit" class="btn btn-lg btn-primary w-100 fs-6">Compute</button>
    </div>
    <div class="input-group mb-3">
        <button class="btn btn-lg btn-light w-100 fs-6">
            <span class="bi bi-bank me-2"></span>
            <small>Book this Facility</small>
        </button>
    </div>
</form>
          </div>

        </div>

      </div>
    </section><!-- End Portfolio Details Section -->















  <!-- ======= Footer ======= -->
  <footer id="footer">

    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-4 col-md-6 footer-newsletter">
            <h4>Join Our Newsletter</h4>
            <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
            <form action="" method="post">
              <input type="email" name="email"><input type="submit" value="Subscribe">
            </form>
          </div>

        </div>
      </div>
    </div>

    <div class="container">

      <div class="copyright-wrap d-md-flex py-4">
        <div class="me-md-auto text-center text-md-start">
          <div class="copyright">
            &copy; Copyright <strong><span>Techie</span></strong>. All Rights Reserved
          </div>
          <div class="credits">
            <!-- All the links in the footer should remain intact. -->
            <!-- You can delete the links only if you purchased the pro version. -->
            <!-- Licensing information: https://bootstrapmade.com/license/ -->
            <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/techie-free-skin-bootstrap-3/ -->
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
        <div class="social-links text-center text-md-right pt-3 pt-md-0">
          <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
          <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
          <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
          <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
          <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
        </div>
      </div>

    </div>
  </footer><!-- End Footer -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  <div id="preloader"></div>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>

</body>

</html>