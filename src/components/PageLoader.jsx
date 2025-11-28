import { motion } from 'framer-motion';
import AshokaChakra from './AshokaChakra';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl">
            <div className="relative flex items-center justify-center flex-col gap-4">
                <div className="relative">
                    <motion.div
                        className="absolute inset-0 rounded-full bg-india-blue/20 blur-xl"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0.2, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <AshokaChakra className="w-24 h-24 text-india-saffron" />
                </div>
                <motion.p
                    className="text-white font-bold tracking-widest text-sm mt-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    LOADING...
                </motion.p>
            </div>
        </div>
    );
};

export default PageLoader;
