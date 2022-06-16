import React from 'react'
import './SportSelector.css'
export default function SportSelector ( { sport, onSportSelected , short } ) {

    const SPORTS = [
        'basketball',
        'volleyball',
        'soccer',
        'football'
    ]


    return (
        <div className={`sport-groups ${short && 'short'}`}>
            {SPORTS.map( ( _sport ) => (
                <div className={`sport ${sport == _sport && `selected`}`}
                    onClick={() => {
                        if ( onSportSelected ) {
                            onSportSelected( _sport );
                        }
                    }}
                >
                    {_sport}
                </div>
            ) )}
        </div>

    )
}
