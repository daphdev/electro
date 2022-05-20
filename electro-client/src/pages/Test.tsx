import React from "react";
import {Link} from "react-router-dom";
import {NavbarNested} from "../components/NavbarNested/NavbarNested";

export default function Test() {
    return (
        <div>
            <nav>
                <Link to="/">Client</Link> | <Link to="/admin">Admin</Link> | <Link to="/test">Test</Link>
            </nav>
            <h1>Test Side</h1>
            <NavbarNested/>
        </div>
    )
}
