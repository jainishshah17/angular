import * as webdriver from 'selenium-webdriver';
export var browser = global['browser'];
export var $ = global['$'];
export function clickAll(buttonSelectors) {
    buttonSelectors.forEach(function (selector) { $(selector).click(); });
}
export function verifyNoBrowserErrors() {
    // TODO(tbosch): Bug in ChromeDriver: Need to execute at least one command
    // so that the browser logs can be read out!
    browser.executeScript('1+1');
    browser.manage().logs().get('browser').then(function (browserLog) {
        var filteredLog = browserLog.filter(function (logEntry) {
            if (logEntry.level.value >= webdriver.logging.Level.INFO.value) {
                console.log('>> ' + logEntry.message);
            }
            return logEntry.level.value > webdriver.logging.Level.WARNING.value;
        });
        expect(filteredLog).toEqual([]);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZTJlX3V0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTNqcGNLakg1LnRtcC9hbmd1bGFyMi9zcmMvdGVzdGluZy9lMmVfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxLQUFLLFNBQVMsTUFBTSxvQkFBb0I7QUFFL0MsT0FBTyxJQUFJLE9BQU8sR0FBd0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVELE9BQU8sSUFBSSxDQUFDLEdBQXNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUU5Qyx5QkFBeUIsZUFBZTtJQUN0QyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQVMsUUFBUSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFFRDtJQUNFLDBFQUEwRTtJQUMxRSw0Q0FBNEM7SUFDNUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLFVBQVU7UUFDN0QsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFTLFFBQVE7WUFDbkQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHdlYmRyaXZlciBmcm9tICdzZWxlbml1bS13ZWJkcml2ZXInO1xuXG5leHBvcnQgdmFyIGJyb3dzZXI6IHByb3RyYWN0b3IuSUJyb3dzZXIgPSBnbG9iYWxbJ2Jyb3dzZXInXTtcbmV4cG9ydCB2YXIgJDogY3NzU2VsZWN0b3JIZWxwZXIgPSBnbG9iYWxbJyQnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrQWxsKGJ1dHRvblNlbGVjdG9ycykge1xuICBidXR0b25TZWxlY3RvcnMuZm9yRWFjaChmdW5jdGlvbihzZWxlY3RvcikgeyAkKHNlbGVjdG9yKS5jbGljaygpOyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeU5vQnJvd3NlckVycm9ycygpIHtcbiAgLy8gVE9ETyh0Ym9zY2gpOiBCdWcgaW4gQ2hyb21lRHJpdmVyOiBOZWVkIHRvIGV4ZWN1dGUgYXQgbGVhc3Qgb25lIGNvbW1hbmRcbiAgLy8gc28gdGhhdCB0aGUgYnJvd3NlciBsb2dzIGNhbiBiZSByZWFkIG91dCFcbiAgYnJvd3Nlci5leGVjdXRlU2NyaXB0KCcxKzEnKTtcbiAgYnJvd3Nlci5tYW5hZ2UoKS5sb2dzKCkuZ2V0KCdicm93c2VyJykudGhlbihmdW5jdGlvbihicm93c2VyTG9nKSB7XG4gICAgdmFyIGZpbHRlcmVkTG9nID0gYnJvd3NlckxvZy5maWx0ZXIoZnVuY3Rpb24obG9nRW50cnkpIHtcbiAgICAgIGlmIChsb2dFbnRyeS5sZXZlbC52YWx1ZSA+PSB3ZWJkcml2ZXIubG9nZ2luZy5MZXZlbC5JTkZPLnZhbHVlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCc+PiAnICsgbG9nRW50cnkubWVzc2FnZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbG9nRW50cnkubGV2ZWwudmFsdWUgPiB3ZWJkcml2ZXIubG9nZ2luZy5MZXZlbC5XQVJOSU5HLnZhbHVlO1xuICAgIH0pO1xuICAgIGV4cGVjdChmaWx0ZXJlZExvZykudG9FcXVhbChbXSk7XG4gIH0pO1xufVxuIl19