import { DEVELOPER_KEY } from '../../env.js';

const SuperViz = (function () {
   // let ::
   let sdk = null;

   // const ::
   const MY_PARTICIPANT_JOINED_SDK = 'my_participant_joined';

   const initSDK = async function (userId, roomid, name, userType) {
      sdk = await SuperVizSdk.init(DEVELOPER_KEY, {
         group: {
            id: '<GROUP-ID>',
            name: '<GROUP-NAME>',
         },
         participant: {
            id: userId,
            name: name,
            type: userType,
         },
         roomId: roomid,
         defaultAvatars: true,
         enableFollow: true,
         enableGoTo: true,
         enableGather: true,
         camsOff: false,
         layoutPosition: 'center',
         camerasPosition: 'right',
      });

      // Pubsub - listen for event: Matterport loaded & unloaded ::
      sdk.subscribe(SuperVizSdk.MeetingEvent.MY_PARTICIPANT_JOINED, onMyParticipantJoined);
   };

   const onMyParticipantJoined = function (participant) {
      // publish that I've connected ::
      PubSub.publish(MY_PARTICIPANT_JOINED_SDK, { sdk: sdk, participant: participant });
   };

   // Public
   return {
      init: (userId, roomid, name, userType) => initSDK(userId, roomid, name, userType),
      MY_PARTICIPANT_JOINED: MY_PARTICIPANT_JOINED_SDK,
   };
})();

export { SuperViz };
