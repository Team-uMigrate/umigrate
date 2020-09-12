using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace system_tests
{
    class tests
    {
        private IWebDriver driver;

        [SetUp]
        public void startBrowser()
        {
            ChromeOptions chromeOptions = new ChromeOptions();
            var driverPath = Path.Combine(Directory.GetCurrentDirectory());
            var envChromeWebDriver = Environment.GetEnvironmentVariable("ChromeWebDriver");
            if (!string.IsNullOrEmpty(envChromeWebDriver) &&
               File.Exists(Path.Combine(envChromeWebDriver, "chromedriver.exe")))
            {
                driverPath = envChromeWebDriver;
            }
            else
            {
                // Local path to Chrome Driver
                driverPath = "C:\\uMigrate";
            }
            ChromeDriverService defaultService = ChromeDriverService.CreateDefaultService(driverPath);
            defaultService.HideCommandPromptWindow = true;
            driver = (IWebDriver)new ChromeDriver(defaultService, chromeOptions);
        }

        [Test]
        public void simpleTest()
        {
            driver.Navigate().GoToUrl("http://google.com");
        }

        [TearDown]
        public void closeBrowser()
        {
            driver.Quit();
        }
    }
}
