import React from 'react'
import hr from "../../images/hr.jpg";
import finance from "../../images/finance.jpg";
import internalAudit from "../../images/internal audit.jpg";
import strategic from "../../images/bus management.jpg";
import risk from "../../images/risk management.jpg";
import legal from "../../images/Legal.jpg";
import marketing from "../../images/marketing.jpg";
import sales from "../../images/sales.jpg";
import software from "../../images/software.jpg";
import technology from "../../images/tech support.jpg";

function Roles() {

    React.useEffect(()=>{
        window.scrollTo(0, 0);
    });

    return (
        <div >
            <br /><br />
            <h1 className="text-center">Careers at Choober</h1>
            <br /><br />
            <div className="container">
                <div className="col mb-4">
                    <div className="card text-center">
                        <img src={hr} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Human Resources</h5>
                            <p className="card-text">Human Resources serves as a strategic partner to the firm in recruiting,
                            managing, and developing talent accross the organization. Human Resources provides a broad
                            range of services, programs and products to company employees, in addition to managing
                            internal initiatives aimed at upholding the firm's strong reputation and culture.</p>

                        </div>
                    </div>
                </div>

                <div className="col mb-4">
                    <div className="card text-center">
                        <img src={finance} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Finance</h5>
                            <p className="card-text">Finance's mission is to be a trusted, world-class global finance
                            organization by delivering timely, acurate and insightful financial information and
                            analysis. The group provides thought leadership across the firm's rigorous control and risk
                            management environment to enhance decision making, optimize allocation of firm resources and
                            help achieve the firm's objectives.</p>

                        </div>
                    </div>
                </div>
                <div className="col mb-4">
                    <div className="card text-center">
                        <img src={internalAudit} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Internal Audit</h5>
                            <p className="card-text">Internal Audit's primary mission is to provide assurance to the Board of
                            Directors and executive management that the firm's businesses are well managed and meeting
                            strategic, operational and risk management objectives. The team engages with senior leaders
                            and all businesses globally to understand and advise on the risks in their business,
                            evaluate the effectiveness of key processes and assist in the design of best practices that
                            can improve their results.</p>

                        </div>
                    </div>
                </div>
                <div className="col mb-4">
                    <div className="card text-center">
                        <img src={strategic} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Strategic Initiatives &amp; Business Management</h5>
                            <p className="card-text">Our Strategic Initiatives and Business Management teams collaborate with
                            multiple internal and external partners to ensure integrated delivery of the firm's
                            capabilities to our clients globally. These teams drive key initiatives and ensure
                            consistent messaging and coordination with internal partners across the firm. Through
                            strategic planning and analysis, these teams act as the "connective tissue" of their
                            business, monitor business results, allocate resources, and implement metrics-driven client
                            support.</p>

                        </div>
                    </div>
                </div>

                <div className="col mb-4">
                    <div className="card text-center">
                        <img src={risk} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Risk &amp; Quantitative Analysis</h5>
                            <p className="card-text">The Risk and Quantitative Analysis team provides independent oversight of
                            the firm's fiduciary and enterprise risks by developing and delivering risk management,
                            tailored advice and analytics. The RQA team promotes the firm as a leader in risk managemnt
                            by providing top-down and bottom-up oversight to help identify risks. The team produces
                            quantitative analysis to support the firm in managing its risks.</p>

                        </div>
                    </div>
                </div>
                <div className="col mb-4">
                    <div className="card text-center">
                        <img src={legal} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Legal &amp; Compliance</h5>
                            <p className="card-text">The Legal &amp; Compliance team's mission is to deliver the highest quality
                            services to the firm; to understand and advise on the impact of regulatory requirements and
                            best practices; and to develop and implement an effective compliance program designed to
                            address compliance with regulatory, client and firm requirements globally.</p>

                        </div>
                    </div>
                </div>

                <div className="col mb-4">
                    <div className="card text-center">
                        <img src={marketing} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Marketing &amp; Corporate Communications</h5>
                            <p className="card-text">
                                The Global Marketing &amp; Corporate Communications team create, communicate and deliver the
                                firm's brand to institutional and retail clients worldwide. We see client expectations,
                                behaviors, perceptions, and technologies changing - at an accelerating rate. With client
                                needs top-of-mind at all times, we are helping define what the next generation looks like.
                        </p>

                        </div>
                    </div>
                </div>
                <div className="col mb-4">
                    <div className="card text-center">
                        <img src={sales} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Sales &amp; Relationship Management</h5>
                            <p className="card-text">The Sales &amp; Relationship Management team delivers products, and services
                            through various distribution partners accross the world. Global Retail has strength accross
                            geographies and asset classes.</p>

                        </div>
                    </div>
                </div>
                <div className="col mb-4">
                    <div className="card text-center">
                        <img src={software} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Software Engineering</h5>
                            <p className="card-text">The Software Engineering team builds products and services to meet the
                            needs of the firm and all of its clients. The team is made up of software engineers, data
                            scientists, data engineers, quant developers, DevOps engineers, product managers, business
                            analysts, UX/UI engineers and more, all working to drive innovation in the industry.</p>

                        </div>
                    </div>
                </div>
                <div className="col mb-4">
                    <div className="card text-center">
                        <img src={technology} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Technology Support</h5>
                            <p className="card-text">The Technology Support team consists of system administrators, software
                            engineers, incident managers, and project managers focusing on maintaining the stability and
                            efficiency of the firm's technology.</p>

                        </div>
                    </div>
                </div>
                <div className="col mb-4 cantTouchThis" id="whyWait">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">What are you waiting for?</h5>
                            <p className="card-text">Take the first step in starting your new, spectacular career. Create an account and join Choober today!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Roles