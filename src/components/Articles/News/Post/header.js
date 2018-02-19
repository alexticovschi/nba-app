import React from 'react';

import TeamInfo from '../../Elements/teamInfo';
import PostData from '../../Elements/postData';


const header = (props) => {

    const teamInfo = (team) => {
        return team ? (
            <TeamInfo team={team} />
        ) : null
    }

    const postData = (date, author) => {
        return (
            <div>
                <PostData data={{date, author}} />
            </div>
        )
    }

    return(
        <div>
            {teamInfo(props.teamData)}
            {postData(props.date, props.author)}
        </div>
    )
}

export default header;