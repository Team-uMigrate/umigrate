cd $(System.DefaultWorkingDirectory)/_umigrate-mobile/drop
expo login -u teamumigrate -p $($env:SUPERUSER_PASSWORD)
expo publish

