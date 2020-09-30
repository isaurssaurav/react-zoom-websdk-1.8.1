import * as React from 'react';
import { ZoomMtg } from '@zoomus/websdk';
ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.1/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();


const meetingNumber = '' // add here



const meetingConfig = {
    username: 'Classroom',
    meetingNumber,
    password: '',
    leaveUrl: `${window.origin}`,
    role: 0,
}

const Zoom = () => {
    React.useEffect(() => {
        init()
        return function closeZoom() {
            ZoomMtg.leaveMeeting({});
        }
    }, [])
    const init = () => {
        console.log("here here")
        console.log('checkSystemRequirements');
        console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

        var API_KEY = process.env.REACT_APP_ZOOM_API_KEY;

        var API_SECRET = process.env.REACT_APP_ZOOM_API_SECRET
        var meetingConfiguration = meetingConfig;
        var meetConfig = {
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            meetingNumber: parseInt(meetingConfiguration.meetingNumber, 10),
            userName: meetingConfiguration.username,
            passWord: meetingConfiguration.password,
            leaveUrl: meetingConfiguration.leaveUrl,
            role: parseInt(meetingConfiguration.role, 10)
        };

        ZoomMtg.generateSignature({
            meetingNumber: meetConfig.meetingNumber,
            apiKey: meetConfig.apiKey,
            apiSecret: meetConfig.apiSecret,
            role: meetConfig.role,
            success: (res) => {
                setTimeout(() => {
                    joinMeeting(res.result, meetConfig);
                }, 1000);
            },
            error(err) {
                console.log(err)
            }
        });
    };
    const joinMeeting = (signature, meetConfig) => {
        debugger
        ZoomMtg.init({
            leaveUrl: meetConfig.leaveUrl,
            isSupportAV: true,
            success(initRes) {
                debugger
                ZoomMtg.join(
                    {
                        meetingNumber: meetConfig.meetingNumber,
                        userName: meetConfig.userName,
                        signature: signature,
                        apiKey: meetConfig.apiKey,
                        passWord: meetConfig.passWord,
                        success: function (res) {
                            console.log('join meeting success');
                        },
                        error: function (err) {
                            debugger

                            console.log('error ==> ', err);
                        }
                    }
                );
            },
            error(res) {
                console.log(res)
            }
        })
    }

    return ""
}

export default Zoom;
