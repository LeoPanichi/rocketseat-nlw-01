import React, {useCallback, useState} from 'react';

import {useDropzone} from 'react-dropzone';

import {FiUpload} from 'react-icons/fi';

import './styles.css'

// Interface para uma função que possa ser chamada de outro arquivo
interface Props {
    onUploadedFile: (file: File) => void
}

// Colocando a propriedade da função como aceita pelo objeto
const Dropzone: React.FC<Props> = (props) => {
    const {onUploadedFile}= props;

    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onUploadedFile(file);
    }, [onUploadedFile]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return(
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept='image/*' />
            {
                selectedFileUrl ?
                <img src={selectedFileUrl} alt="Point thumbnail" /> :
                    isDragActive ?
                    <p>
                        <FiUpload />
                        Solte a imagem do estabelecimento aqui...
                    </p> :    
                    <p>
                        <FiUpload />
                        Arraste ou Clique para selecionar imagens do estabelecimento
                    </p>
            }
        </div>
    );
}

export default Dropzone;