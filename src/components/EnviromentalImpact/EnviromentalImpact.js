import React from "react";
import { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

function EnviromentalImpact(props) {
    return (
        <div>

            <div>
                <h3>Enviromental Impact</h3>
            </div>
            <div>
                <select>
                    <option>Select Beginning Year</option>
                </select>
                <select style={{ marginLeft: '5%' }}>
                    <option>Select Ending Year</option>
                </select>
            </div>
            <div>
                <button>Calculate C02 Emmisions</button>
            </div>

        </div>


    );
}

export default EnviromentalImpact