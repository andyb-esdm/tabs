using Microsoft.AspNetCore.SignalR;

namespace Hubs
{
    public class TestHub : Hub
    {
        public async Task Send(string data)
        {
            await Clients.All.SendAsync("Send", data);
        }
    }
}