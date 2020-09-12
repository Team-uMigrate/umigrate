using NUnit.Framework;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace system_tests
{
    class console
    {
        [Test]
        public void consoleTest()
        {
            Console.WriteLine("This is a console Test");
            var hi = "hello";
        }
    }
}
