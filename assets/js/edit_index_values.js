fetch("https://api.github.com/gists/5696808013548492a67fb21c32759479")
                .then(response => response.json())
                .then((data) => {
                    data = JSON.parse(data.files["botstatus.json"].content)
                    document.getElementById("version").innerHTML = data.version
                    let i = 0;
                    const membersHolder = document.getElementById("userAmount");
                    const server_amountHolder = document.getElementById("serverAmount")
                    const commandsHolder = document.getElementById("commandAmount")
                    const max = Math.max(data.userAmount, data.serverAmount, data.commandAmount);
                    const rateOfChange = max / 100;
                    console.log(data)
                    const funcs = {
                      members() {
                        i += rateOfChange;
                        if (i >= data.userAmount) {
                          membersHolder.innerHTML = data.userAmount;
                          funcs.members = () => {};
                          return;
                        }
                        membersHolder.innerHTML = Math.round(i)
                      },
                      server_amount() {
                        i += rateOfChange;
                        if (i >= data.serverAmount) {
                          server_amountHolder.innerHTML = data.serverAmount;
                          funcs.server_amount = () => {};
                          return;
                        }
                        server_amountHolder.innerHTML = Math.round(i)
                      },
                      commands() {
                        i += rateOfChange;
                        if (i >= data.commandAmount) {
                          commandsHolder.innerHTML = data.commandAmount;
                          funcs.commands = () => {};
                          return;
                        }
                        commandsHolder.innerHTML = Math.round(i)
                      },
                      update(max, interval) {
                        funcs.members();
                        funcs.server_amount();
                        funcs.commands();
                        if (i >= max) {
                          clearInterval(interval);
                        }
                      }
                    }
                    const interval = setInterval(() => {
                      funcs.update(max, interval);
                    }, 50);
                })