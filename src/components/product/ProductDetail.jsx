import { arrayOf, number, string } from "prop-types"
import labels from '../../i18n/es.json';
import { Box, Button, Typography } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";

const ProductDetail = ({ product }) => {
    const { id, options, imgUrl, ...attrs } = product

    const [expanded, setExpanded] = useState(false);
    const [overflown, setOverflown] = useState(false);
    const [componentHeight, setComponentHeight] = useState(null)
    const contentRef = useRef(null);

    const MAX_HEIGHT_VH = 30;

    useLayoutEffect(() => {
        if (contentRef.current) {
            const fullHeight = contentRef.current.getBoundingClientRect().height;
            const maxHeightPx = window.innerHeight * (MAX_HEIGHT_VH / 100);
            setOverflown(fullHeight > maxHeightPx);
            setComponentHeight(fullHeight)
        }
    }, [product]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                borderRadius: 2,
                boxShadow: 3,
                p: 3,
                backgroundColor: "background.paper",
            }}
        >
            <Box
                sx={{
                    maxHeight: expanded ? componentHeight : `${MAX_HEIGHT_VH}vh`,
                    overflow: 'hidden',
                    transition: 'max-height 1s ease',
                }}>
                <Box ref={contentRef}>
                    <Typography variant="h7" gutterBottom align="left" fontWeight="bold">
                        {labels.product.sections.description}
                    </Typography>
                    {Object.keys(attrs).map((key) => {
                        const value = attrs[key];
                        const label = labels.product.attributes[key] || key // usa label si existe, si no la key

                        if (typeof value === 'string') {
                            return (
                                <Typography key={key} align="left">
                                    <strong>{label}:</strong> {value}
                                </Typography>
                            );
                        }

                        if (typeof value === 'number') {
                            return (
                                <Typography key={key} align="left">
                                    <strong>{label}:</strong> {value}€
                                </Typography>
                            );
                        }

                        if (Array.isArray(value)) {
                            return (
                                <Box key={key}>
                                    <Typography align="left">
                                        <strong>{label}:</strong>
                                    </Typography>
                                    {value.map((item, index) => (
                                        <Typography key={index} sx={{ ml: 2 }} align="left">
                                            - {item}
                                        </Typography>
                                    ))}
                                </Box>
                            );
                        }

                        return null; // para otros tipos
                    })}
                </Box>
            </Box>
            {overflown && (
                <Button variant="text" color="secondary" onClick={() => setExpanded(prev => !prev)} >
                    {expanded ? labels.common.seeLess : labels.common.seeMore}
                </Button>
            )}
        </Box>
    )
}

ProductDetail.propTypes = {
    id: string.isRequired,
    brand: string.isRequired,
    model: string.isRequired,
    price: number,
    imgUrl: string.isRequired,
    networkTechnology: string,
    networkSpeed: string,
    gprs: string,
    edge: string,
    announced: string,
    status: string,
    dimentions: string,
    weight: string,
    sim: arrayOf(string),
    displayType: string,
    displayResolution: string,
    displaySize: string,
    os: string,
    cpu: string,
    chipset: string,
    gpu: string,
    externalMemory: string,
    internalMemory: arrayOf(string),
    ram: string,
    primaryCamera: arrayOf(string),
    secondaryCmera: string,
    speaker: string,
    audioJack: string,
    wlan: string,
    bluetooth: arrayOf(string),
    gps: string,
    nfc: string,
    radio: string,
    usb: string,
    sensors: arrayOf(string),
    battery: string,
    colors: arrayOf(string),
}

export default ProductDetail;