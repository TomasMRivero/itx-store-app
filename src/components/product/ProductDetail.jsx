import { arrayOf, number, string } from "prop-types"
import labels from '../../i18n/es.json';
import { Box, Typography } from "@mui/material";

const ProductDetail = ({ product }) => {
    const {id, options, imgUrl, ...attrs} = product
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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