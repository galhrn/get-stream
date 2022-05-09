import React, { useEffect, useState } from "react";
import { Channel as StreamChannel, StreamChat } from "stream-chat";
import "@stream-io/stream-chat-css/dist/css/index.css";

import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
} from "stream-chat-react";
import "./App.css";

const apiKey = process.env.REACT_APP_STREAM_API_KEY ?? "";

const user = {
  id: "1",
  name: "Gal aharon",
  image: "https://getstream.imgix.net/images/random_svg/FS.png",
};

const App = () => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null);

  const { name, image } = user;

  useEffect(() => {
    const { id: userId } = user;

    (async () => {
      const chatClient = StreamChat.getInstance(apiKey);
      await chatClient.connectUser(user, chatClient.devToken(userId));

      const channel = chatClient.channel("messaging", "channel-id");
      await channel.watch();

      setChannel(channel);
      setClient(chatClient);
    })();

    // if (client) return () => client.disconnectUser();
  }, [client]);

  if (!channel || !client) return <LoadingIndicator />;

  return (
    <div className="App">
      <Chat client={client}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default App;
