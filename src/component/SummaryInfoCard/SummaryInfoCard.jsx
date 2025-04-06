import React from 'react';
import './SummaryInfoCard.css'; // Import CSS file for styling

const SummaryInfoCard = ({content}) => {
    return (
        <div className="summary-info-card">
            <div className="summary-icon">
                {content.icon}
            </div>
            <div className="summary-content">
                <p>{content.title}</p>
                <h2>{content.count}</h2>
            </div>
        </div>

    );
}

export default SummaryInfoCard;