document.addEventListener('DOMContentLoaded', () => {
    const converterType = document.getElementById('converter-type');
    const inputValue = document.getElementById('input-value');
    const inputUnit = document.getElementById('input-unit');
    const outputUnit = document.getElementById('output-unit');
    const outputValue = document.getElementById('output-value');

    const units = {
        length: {
            'm': '미터(m)',
            'km': '킬로미터(km)',
            'cm': '센티미터(cm)',
            'mm': '밀리미터(mm)',
            'in': '인치(in)',
            'ft': '피트(ft)',
        },
        weight: {
            'kg': '킬로그램(kg)',
            'g': '그램(g)',
            'lb': '파운드(lb)',
            'oz': '온스(oz)',
        },
        temperature: {
            'c': '섭씨(°C)',
            'f': '화씨(°F)',
            'k': '켈빈(K)',
        }
    };

    const conversionRates = {
        length: {
            'm': 1,
            'km': 1000,
            'cm': 0.01,
            'mm': 0.001,
            'in': 0.0254,
            'ft': 0.3048,
        },
        weight: {
            'kg': 1,
            'g': 0.001,
            'lb': 0.453592,
            'oz': 0.0283495,
        }
    };

    function populateUnits() {
        const type = converterType.value;
        const unitOptions = units[type];

        inputUnit.innerHTML = '';
        outputUnit.innerHTML = '';

        for (const key in unitOptions) {
            inputUnit.add(new Option(unitOptions[key], key));
            outputUnit.add(new Option(unitOptions[key], key));
        }
        // Set default different units
        if (Object.keys(unitOptions).length > 1) {
            outputUnit.value = Object.keys(unitOptions)[1];
        }
        convert();
    }

    function convert() {
        const type = converterType.value;
        const fromUnit = inputUnit.value;
        const toUnit = outputUnit.value;
        const value = parseFloat(inputValue.value);

        if (isNaN(value)) {
            outputValue.value = '';
            return;
        }

        let result;
        if (type === 'temperature') {
            // 온도 변환 로직
            if (fromUnit === 'c') {
                if (toUnit === 'f') result = (value * 9/5) + 32;
                else if (toUnit === 'k') result = value + 273.15;
                else result = value;
            } else if (fromUnit === 'f') {
                if (toUnit === 'c') result = (value - 32) * 5/9;
                else if (toUnit === 'k') result = ((value - 32) * 5/9) + 273.15;
                else result = value;
            } else if (fromUnit === 'k') {
                if (toUnit === 'c') result = value - 273.15;
                else if (toUnit === 'f') result = ((value - 273.15) * 9/5) + 32;
                else result = value;
            }
        } else {
            // 길이, 무게 등 일반 변환
            const fromRate = conversionRates[type][fromUnit];
            const toRate = conversionRates[type][toUnit];
            result = (value * fromRate) / toRate;
        }

        outputValue.value = result.toFixed(5);
    }

    converterType.addEventListener('change', populateUnits);
    inputValue.addEventListener('input', convert);
    inputUnit.addEventListener('change', convert);
    outputUnit.addEventListener('change', convert);

    // Initial population
    populateUnits();
});