import React from 'react';

export default class ChatRightBubble extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="media my-msg">
                <div className="media-top">
                    At 20:07 on August 2
                </div>

                <div className="media-body">
                    <div className="msg pull-right">
                        sarrsamee rae hpinaut! tait u myaha in tainrayy hk manaathpyan k nhaitsatoe lain mai aatainn hce linemyarrrae start pyeenoutaahcawpine Bird ko aanaeengaal laatmhaattway yanae noutsonenae hpyiteat . aouttobharl 1, bigwigs nhaint myawwataamayrik htuuhkyawan nhain
                    </div>
                </div>
                <div className="media-right ">
                    <a className="media-right" href="#">
                        <img className="media-object" src="img/user.png" alt="image" height="40" width="40"></img>
                    </a>
                </div>

            </div>
        )
    }
}