import { ChannelContext, UserContext } from "..";
const Child1 = () => {
  return (
    <UserContext.Consumer>
      {(user) => {
        return (
          <ChannelContext.Consumer>
            {(channel) => {
              return (
                <>
                  Hello {user}, {channel}
                </>
              );
            }}
          </ChannelContext.Consumer>
        );
      }}
    </UserContext.Consumer>
  );
};

export default Child1;
