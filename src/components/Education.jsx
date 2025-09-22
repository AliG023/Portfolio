import './Education.css'

export default function Education () {
    return(
        <>
            <div className='page'>
                <div className='tables'>
                    <h2>Post Secondary Education</h2>
                    <div className='education-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>School</th>
                                    <th>Dates</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> Software Engineer Technology </td>
                                    <td> Centennial College, Toronto </td>
                                    <td> Sep.2024 - Present </td>
                                </tr>
                                <tr>
                                    <td> Aeronautical Engineering </td>
                                    <td> Defence College of Aeronautical Engineering, England </td>
                                    <td> Jun.2010 - Oct.2013 </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3>Additional Skills & Certifications</h3>
                    <div className='skills-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>School</th>
                                    <th>Dates</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> Measurement Canada Inspection Technician </td>
                                    <td> Measurement Canada </td>
                                    <td> Jul.2022 </td>
                                </tr>
                                <tr>
                                    <td> NFPA 1001 Firefighter I & II </td>
                                    <td> College of the Rockies </td>
                                    <td> Nov.2021 </td>
                                </tr>
                                <tr>
                                    <td> NFPA 1071 Hazmat Awareness & Operations </td>
                                    <td> College of the Rockies </td>
                                    <td> Nov.2021 </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}