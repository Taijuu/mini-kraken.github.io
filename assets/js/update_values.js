fetch("https://api.github.com/gists/de2543aa80dee00274edf3861c7d087e")
                .then(response => response.json())
                .then((data) => {
                    data = JSON.parse(data.files["botstatus.json"].content)
                    document.getElementById("version").innerHTML = data.version
                    let i = 0;
                    const membersHolder = document.getElementById("userAmount");
                    const server_amountHolder = document.getElementById("serverAmount")
                    const commandsHolder = document.getElementById("commandAmount")
                    const max = Math.max(data.members, data.server_amount, data.commands);
                    const rateOfChange = max / 100;

                    const funcs = {
                      members() {
                        i += rateOfChange;
                        if (i >= data.members) {
                          membersHolder.innerHTML = data.members;
                          funcs.members = () => {};
                          return;
                        }
                        membersHolder.innerHTML = Math.round(i)
                      },
                      server_amount() {
                        i += rateOfChange;
                        if (i >= data.server_amount) {
                          server_amountHolder.innerHTML = data.server_amount;
                          funcs.server_amount = () => {};
                          return;
                        }
                        server_amountHolder.innerHTML = Math.round(i)
                      },
                      commands() {
                        i += rateOfChange;
                        if (i >= data.commands) {
                          commandsHolder.innerHTML = data.commands;
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