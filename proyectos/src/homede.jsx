import React from "react";
import './styles/App.css'
import { Container, Row, Col, Image } from "react-bootstrap"
import { Link } from "react-router-dom";

const Homede = () => {
    return (
        <Container>
            <Row>
                <Col className="justify-content-center">
                    <h2> Herzlich willkommen, liebe Lehrerinnen und Lehrer der Pestalozzi Schule!</h2>

                    <p>
                        Es ist uns eine Freude, Sie herzlich auf unserer internen Plattform begrüßen zu dürfen, die der Einreichung von Projekten gewidmet ist, die im Laufe des Jahres in den drei Zyklen - Vorschule, Grundschule und Sekundarschule - durchgeführt werden. Diese Initiative fällt unter den Schwerpunkt Projekte des Programms zur pädagogischen Verbesserung (PQM) und spiegelt unser fortwährendes Engagement für pädagogische Exzellenz und Innovation im Lehr- und Lernprozess wider.

                        Auf dieser Plattform finden Sie einen Raum, der darauf ausgelegt ist, das Management und die Verfolgung von Projekten zu erleichtern, die zur Bereicherung der Bildungserfahrung in jedem Zyklus beitragen. Wir freuen uns auf die Gelegenheit, neue Ideen, Methoden und pädagogische Ansätze zu erkunden, die die Qualität der von uns angebotenen Bildung stärken.

                        Wir ermutigen Sie, dieses Tool bestmöglich zu nutzen, indem Sie Ihre Projekte mit Begeisterung und Kreativität einreichen. Dieser Raum wird nicht nur die Organisation und Zusammenarbeit zwischen den Arbeitsgruppen erleichtern, sondern auch den Austausch bewährter Praktiken fördern und einen fruchtbaren Wissensaustausch ermöglichen.

                        Wir danken Ihnen für Ihr Engagement und Ihren Beitrag zur ganzheitlichen Entwicklung unserer Schülerinnen und Schüler. Gemeinsam werden wir daran arbeiten, Innovation und kontinuierliche Verbesserung in unserem Bildungsprozess voranzutreiben. Wir stehen immer offen für Anregungen und Feedback, um uns weiter zu verbessern.

                        Möge dieser Raum ein Spiegelbild der Zusammenarbeit und des Engagements sein, die unsere Bildungsgemeinschaft an der Pestalozzi Schule auszeichnen!</p>
                </Col>

            </Row>
        </Container>

    );
}

export { Homede }