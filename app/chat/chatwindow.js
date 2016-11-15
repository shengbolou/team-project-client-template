import React from 'React';

export default class ChatWindow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-7 col-sm-7 col-xs-7 chat-right" style={{
                'paddingLeft': '0px'
            }}>
                <div className="panel panel-dafault" style={{
                    'height': '107%'
                }}>
                    <div className="panel-heading panel-heading-chatwindow">
                        <div className="media">
                            <a className="media-left" href="#">
                                <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                            </a>
                            <div className="media-body">
                                <div className="media-heading">

                                    <div className="media">
                                        <div className="media-left media-body">
                                            <font size="3">Name 4</font>
                                        </div>

                                    </div>
                                </div>
                                <font size="2" color="grey ">
                                    User title</font>
                            </div>
                        </div>
                    </div>

                    <div className="panel-body panel-body-chatwindow" style={{
                        'height': '60vh'
                    }}>
                        <div className="media friend-msg">
                            <div className="media-top">
                                At 20:07 on August 2
                            </div>
                            <div className="media-left ">
                                <a className="media-left" href="#">
                                    <img className="media-object" src="img/user.png" alt="image" height="40" width="40"></img>
                                </a>
                            </div>
                            <div className="media-body" style={{
                                'paddingRight': '0px'
                            }}>
                                <div className="msg">
                                    sarrsamee rae hpinaut! tait u myaha in tainrayy hk manaathpyan k nhaitsatoe lain mai aatainn hce linemyarrrae start pyeenoutaahcawpine Bird ko aanaeengaal laatmhaattway yanae noutsonenae hpyiteat . aouttobharl 1, bigwigs nhaint myawwataamayrik htuuhkyawan nhain
                                </div>
                            </div>
                        </div>
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
                        <div className="media friend-msg">
                            <div className="media-top">
                                At 20:07 on August 2
                            </div>
                            <div className="media-left ">
                                <a className="media-left" href="#">
                                    <img className="media-object" src="img/user.png" alt="image" height="40" width="40"></img>
                                </a>
                            </div>
                            <div className="media-body" style={{
                                'paddingRight': '0px'
                            }}>
                                <div className="msg">
                                    sarrsamee rae hpinaut! tait u myaha in tainrayy hk manaathpyan k nhaitsatoe lain mai aatainn hce linemyarrrae start pyeenoutaahcawpine Bird ko aanaeengaal laatmhaattway yanae noutsonenae hpyiteat . aouttobharl 1, bigwigs nhaint myawwataamayrik htuuhkyawan nhain
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel-footer panel-footer-chatwindow" style={{
                        'backgroundColor': 'white'
                    }}>

                        <div className="row panel-icons" style={{
                            'paddingTop': '10px'
                        }}>
                            <div className="row container"></div>
                        </div>

                        <div className="row">
                            <div className="col-md-10 col-xs-10 col-sm-10">
                                <textarea className="form-control msg nohover non-active" name="name" rows="3" cols="40" placeholder="please type text"></textarea>

                            </div>
                            <div className="col-md-2 col-sm-2 col-xs-2 send">
                                <button type="button" className="btn btn-blue-grey pull-right" name="button">Send</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
