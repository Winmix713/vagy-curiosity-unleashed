import { useEffect, useState, useRef } from 'react';

const useElementScroll = () => {
    const ref = useRef(null);
    const [isOverflown, setIsOverflown] = useState(undefined);
    const [contentHeight, setContentHeight] = useState(undefined);
    const [isTop, setIsTop] = useState(true);
    const [isBottom, setIsBottom] = useState(false);

    const handleScroll = () => {
        const { current } = ref;
        if (!current || !current.children[0]) return;

        const child = current.children[0];

        setIsTop(child.scrollTop === 0);
        setIsBottom(
            child.scrollHeight === Math.ceil(child.scrollTop + child.clientHeight)
        );

        current.classList.toggle('is-top', child.scrollTop === 0);
        current.classList.toggle('is-bottom', child.scrollHeight === Math.ceil(child.scrollTop + child.clientHeight));
    };

    useEffect(() => {
        const { current } = ref;
        if (!current || !current.children[0]) return;

        const child = current.children[0];

        const updateState = () => {
            const hasOverflow = child.scrollHeight > child.clientHeight;
            setContentHeight(child.scrollHeight);
            setIsOverflown(hasOverflow);
            current.classList.toggle('has-overflow', hasOverflow);
        };

        const resizeObserver = new ResizeObserver(updateState);
        resizeObserver.observe(current);

        child.addEventListener('scroll', handleScroll);
        updateState();

        // Cleanup
        return () => {
            resizeObserver.disconnect();
            child.removeEventListener('scroll', handleScroll);
        };
    }, [ref]);

    return { ref, isOverflown, isTop, isBottom };
};

export default useElementScroll;